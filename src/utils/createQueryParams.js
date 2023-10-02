import { useRouter, usePathname, useSearchParams } from "next/navigation";

const createQueryParams = (key, value) => {
  const router = useRouter;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryList = {};
  const queryUpdate = [];
  searchParams.forEach((value, key) => (queryList[key] = value));
  queryList[key] = value;

  for (const key in queryList) {
    queryUpdate.push(`${key}=${queryList[key]}`);
  }

  const url = `${pathname}?${queryUpdate.join("&")}`;
  router.push(url);
};

export default createQueryParams;
