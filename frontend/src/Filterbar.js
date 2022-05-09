/* eslint-disable jsx-a11y/aria-proptypes */
import {
  Button, Menu, MenuList, MenuButton, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function FilterBar({ filterOptions }) {
  const { toggles, ...sliders } = filterOptions;
  const toggleButtons = Object.keys(toggles).map((key) => {
    const toggle = toggles[key][1];
    return <ToggleButton onClick={toggle} value={key} key={key} />;
  });
  const sliderButtons = Object.keys(sliders).map((key) => {
    const {
      from, to, min, max, setFrom, setTo,
    } = sliders[key];
    return (
      <DrawerSlider
        title={key}
        key={key}
        from={from}
        to={to}
        min={min}
        max={max}
        setFrom={setFrom}
        setTo={setTo}
      />
    );
  });
  return sliderButtons.concat(toggleButtons);
}

function ToggleButton({ onClick, value }) {
  const [isOn, setIsOn] = useState(false);
  const style = isOn ? { background: 'skyblue' } : {};
  return (
    <Button
      type="button"
      onClick={
    () => {
      const newIsOn = !isOn;
      setIsOn(newIsOn);
      onClick(newIsOn);
    }
}
      style={style}
    >
      {value}
    </Button>
  );
}

export function DrawerSlider({
  title, min, max, from, to, setFrom, setTo,
}) {
  const [start, setStart] = useState(from);
  const [end, setEnd] = useState(to);
  return (
    <Menu>
      <MenuButton as={Button}>{title}</MenuButton>
      <MenuList>
        {`${start} -  ${end}`}
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[start, end]}
          min={min}
          max={max}
          onChange={([a, b]) => {
            setStart(a);
            setEnd(b);
          }}
          onChangeEnd={
            ([a, b]) => {
              setFrom(a);
              setTo(b);
            }
          }
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </MenuList>
    </Menu>
  );
}
