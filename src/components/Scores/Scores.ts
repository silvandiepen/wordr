import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { Style } from "@sil/tools";
import { useWordr } from "../../composables/useWordr";

export default defineComponent({
  setup() {
    const style = new Style("scores");
    const { current } = useWordr();

    const values = reactive({
      old: 0,
      current: 0,
      new: 0,
    });

    const newLine = ref(false);

    const setValues = () => {
      newLine.value = true;

      setTimeout(() => {
        newLine.value = false;
      }, 1000);

      setTimeout(() => {
        values.old = current.value.line;
        values.current = current.value.line + 1;
        values.new = current.value.line + 1;
      }, 300);
    };

    onMounted(() => {
      setValues();
    });

    watch(
      () => current.value.line,
      () => setValues()
    );

    return {
      newLine,
      style,
      current,
      values,
    };
  },
});
