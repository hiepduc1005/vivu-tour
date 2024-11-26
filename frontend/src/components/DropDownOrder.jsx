import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Đánh giá cao nhất',
  'Thời lượng tour',
  'Ngày khởi hành',
  'Giá thấp đến cao',
  'Giá cao đến thấp',
 
];

export default function OrderSingleSelectComponent() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState('');

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-single-name-label">Sort by</InputLabel>
        <Select
          labelId="demo-single-name-label"
          id="demo-single-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          style={{  backgroundColor:"#fff"}}

        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={{
                fontWeight: personName === name
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,
                backgroundColor:"#fff"
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
