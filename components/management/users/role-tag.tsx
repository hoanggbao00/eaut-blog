import { cn } from "@/lib/utils";
import { Role } from "@/type";

const RoleTag = ({ role, className }: { role: Role; className?: string }) => {
  const roleClass = {
    ADMIN: "tag-red",
    MODERATOR: "tag-purple",
    WRITER: "tag-yellow",
    USER: "tag-green",
    NONE: "tag-sky",
  };

  return (
    <span
      className={cn(
        `tag ${roleClass[role]} inline-block rounded-full p-1 py-0 text-xs`,
        className,
      )}
    >
      {role}
    </span>
  );
};

export default RoleTag;
