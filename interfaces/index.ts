export interface SelectProps {
  onSelect: (selected: { label: string; value: string } | null) => void;
}
