import React from "react";

interface Props {
   title: string;
}

const TasksByCategoryList: React.FC<Props> = ({
   title,
   children,
}) => {
   return <ul className="[ c-pendingSections ]">{children}</ul>;
};

export default TasksByCategoryList;
