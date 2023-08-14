import GlobalSpinner from "@/components/Spinner/GlobalSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Overlay from "../../Overlay/Overlay";
import MobileMenu from "../../Modal/MobileMenu";

interface Props {
  children: React.ReactNode;
  searchable: boolean;
  title?: string;
  onSearch?: (searchTerm: string) => void;
  filterValues?: string[];
  filterSelectionFunction?: (filterValue: string) => void;
}

export default function Page({
  children,
  title,
  searchable,
  onSearch,
  filterValues,
  filterSelectionFunction,
}: Props) {
  const { loading: loadingAuth, user } = useAuth();
  const { loading: loadingAxios } = useAxios();
  const router = useRouter();

  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/auth/login");
    }
  }, [loadingAuth, user, router]);

  if (loadingAuth || loadingAxios) return <GlobalSpinner />;

  const handleOpen = () => {
    setNavbar(!navbar);
  };
  return (
    <DashboardProvider>
      <Overlay navbar={navbar} handleOpen={handleOpen} />
      <MobileMenu navbar={navbar} handleOpen={handleOpen} />
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="w-full pt-12 px-5 overflow-y-scroll">
          <Header
            title={title || null}
            handleOpen={handleOpen}
            searchable={searchable}
            onSearch={(queryStr) => {
              if (!onSearch) {
                return;
              }

              onSearch(queryStr);
            }}
            filterValues={filterValues}
            filterSelectionFunction={(value) => {
              if (filterSelectionFunction === undefined) {
                return;
              }

              filterSelectionFunction(value);
            }}
          />
          <main>{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
