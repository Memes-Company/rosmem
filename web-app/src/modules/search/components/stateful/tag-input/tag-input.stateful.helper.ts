import styles from './tag-input.module.css';

export const getOperatorsOf = (rootElement: HTMLLabelElement) => ({
  setValueDataset(event: React.ChangeEvent<HTMLInputElement>) {
    const targetElement = event.target;
    const valueElement = rootElement.getElementsByClassName(styles.value).item(0) as HTMLSpanElement | null;

    if (!valueElement) {
      throw new Error('valueElement has value of null or undefined.');
    }

    valueElement.dataset.value = targetElement.value || ' ';
  },
});
