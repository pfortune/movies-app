import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
}

const useFiltering = (filters: Filter[]) => {
    const [filterValues, setFilterValues] = useState(() => {
        return filters.map((f) => ({
            name: f.name,
            value: f.value,
        }));
    });

    const filteringConditions = filters.map((f) => f.condition);

    const filterFunction = (collection: any) => {
        if (!Array.isArray(collection)) {
            return [];
        }

        return filteringConditions.reduce((filteredData, conditionFn, index) => {
            return filteredData.filter((item: any) => {
                return conditionFn(item, filterValues[index].value);
            });
        }, collection);
    };

    return {
        filterValues,
        setFilterValues,
        filterFunction,
    };
};

export default useFiltering;
