const sorters = {
    reduceByCategory: function (
        acc: TasksByCategory,
        cur: Task
    ): TasksByCategory {
        const { category } = cur;

        acc[category] = acc[category] || [];
        acc[category].push(cur);
        return acc;
    },

    byTitle: function (arr: JSX.Element[]): JSX.Element[] {
        return [...arr].sort((a, b) => {
            const nameA = a.props.title.toUpperCase(),
                nameB = b.props.title.toUpperCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    },
};

export default sorters;
