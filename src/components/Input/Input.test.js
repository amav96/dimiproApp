import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Input } from './Input';

describe('renders content', () => {
    const props = {
        placeholder : 'Nombre',
        value: '',
        name: 'Nombre'
    }
    const component = render(<Input {...props} />);
    console.log(component)
})