import { KebabIcon } from "@/assets/icons";
import { TableRowData } from "@/types/tableTypes";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import TH from "./TH";

interface Props {
  headList: string[];
  tableRows?: TableRowData[];
  children?: React.ReactNode;
}

export default function Table({ headList, tableRows, children }: Props) {
  return (
    <div className="w-full text-xs md:text-base relative overflow-x-auto rounded-lg">
      <table className="w-max md:w-full">
        <thead className="w-max md:w-full text-sm md:text-base bg-bw-black-100">
          <tr className="text-white">
            {headList.map((head, index) => (
              <TH text={head} key={index} />
            ))}
          </tr>
        </thead>

        <tbody className="px-4">
          {tableRows &&
            tableRows.map((row, index) => (
              <tr key={index}>
                {row.data.map((data, index) => (
                  <td
                    key={index}
                    className="w-max text-left ps-2 first:ps-5 py-2 md:py-4 font-light"
                  >
                    {data}
                  </td>
                ))}
                {row.actions && (
                  <td className="text-start">
                    <Menu>
                      <MenuHandler>
                        <button>
                          <KebabIcon color="#141414" />
                        </button>
                      </MenuHandler>
                      <MenuList>
                        {row.actions.map((action, index) => (
                          <MenuItem
                            key={index}
                            color="lightBlue"
                            onClick={action.onClick}
                          >
                            {action.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </td>
                )}
              </tr>
            ))}
          {children && children}
        </tbody>
      </table>
    </div>
  );
}
