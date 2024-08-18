import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
}

const useFiltering = (filters: Filter[]) => {
    const [filterValues, setFilterValues] = useState(() => {
        const filterInitialValues = filters.map((f) => ({
            name: f.name,
            value: f.value,
        }));
        return filterInitialValues;
    });

    const filteringConditions = filters.map((f) => f.condition);

    const filterFunction = (collection: any[]) => {
        if (!Array.isArray(collection)) {
            console.warn('Warning: collection is not an array', collection);
            return [];
        }

        return filteringConditions.reduce((data, conditionFn, index) => {
            return data.filter((item: any) => {
                if (!item) {
                    console.warn('Warning: item is undefined or null', item);
                    return false;
                }
                try {
                    return conditionFn(item, filterValues[index].value);
                } catch (error) {
                    console.error('Error applying filter condition:', error);
                    return false;
                }
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
