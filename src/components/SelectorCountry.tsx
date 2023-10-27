import React from 'react'
import { ICountry } from '../types/places.type';
import { Select } from 'antd';
import { LabeledValue } from 'antd/es/select';

interface IPropsSelectorCountry {
    countries: ICountry[],
    onSelect?: Function,
}

export function SelectorCountry(props: IPropsSelectorCountry) {

    const {
        countries,
        onSelect
    } = props;

    return (
        <Select
            showSearch
            style={{ width: '100%' }}
            size="large"
            placeholder="Country"
            onSelect={(value: string | number | LabeledValue, option: ICountry) => onSelect ? onSelect(value, option) : null}
            // @ts-ignore
            autoComplete="none"
            allowClear
            optionFilterProp="children"
        >
            {
            countries && Array.isArray(countries) && 
            countries.map((c : ICountry) => (
                <Select.Option key={c.id} value={c.iso2}>
                {c.name}
                </Select.Option>
            ))
            }
        </Select>
    )
}
