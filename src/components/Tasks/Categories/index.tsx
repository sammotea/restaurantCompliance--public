import React from "react";

import sorters from "../../../utils/sorters";
import transformers from "../../../utils/transformers";

import Category from "./Category";

interface Props {
    tasksArr: iTask[];
    view: CoreStatusOptions;
}

const Categories: React.FC<Props> = ({ tasksArr, view }) => {
    return <>{renderCategories()}</>;

    function renderCategories() {
        const cl = `c-categories c-categories--${transformers.toCamel(view)}`;
        const tasksByCategory = getTasksByCategory();

        const categories = Object.keys(tasksByCategory).map((category) => {
            const tasksArr = tasksByCategory[category];
            return (
                <Category key={category} title={category} tasksArr={tasksArr} />
            );
        });
        return <ul className={cl}>{sorters.byTitle(categories)}</ul>;
    }

    function getTasksByCategory(): iTasksByCategory {
        return tasksArr.reduce(sorters.reduceByCategory, {});
    }
};

export default Categories;
