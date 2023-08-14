export type TableActions = {
  name: string;
  onClick: () => void;
};

export type TableData = string[];

export type TableRowData = {
  data: TableData;
  actions?: TableActions[];
};
