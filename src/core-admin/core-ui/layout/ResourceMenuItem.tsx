import { IconList } from "@tabler/icons-react";
import { useResourceDefinitions } from "../../core/useResourceDedinitions";
import { useCreatePath } from "../../routing";
import { MenuItemLink } from "./MenuItemLink";

export const ResourceMenuItem = ({ name }: { name: string }) => {
  const resources = useResourceDefinitions();
  const createPath = useCreatePath();

  if (!resources || !resources[name]) return null;

  return (
    <MenuItemLink
      to={createPath({ resource: name, type: "list" })}
      name={name}
      icon={resources[name].icon ? resources[name].icon : IconList}
    />
  );
};
