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
      currentMin, currentMax, min, max, onMinChange, onMaxChange,
    } = sliders[key];
    return (
      <DrawerSlider
        title={key}
        key={key}
        currentMin={currentMin}
        currentMax={currentMax}
        min={min}
        max={max}
        onMinChange={onMinChange}
        onMaxChange={onMaxChange}
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
/*
<DrawerSlider
title="price"
currentMin={10}
currentMax={30}
onMinChange={(a) => alert(`New min : ${a}`)}
onMaxChange={(a) => alert(`New max${a}`)} />
*/
export function DrawerSlider({
  title, min, max, currentMin, currentMax, onMinChange, onMaxChange,
}) {
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);
  return (
    <Menu>
      <MenuButton as={Button}>{title}</MenuButton>
      <MenuList>
        {`${localMin} -  ${localMax}`}
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[localMin, localMax]}
          min={min}
          max={max}
          onChange={([a, b]) => {
            setLocalMin(a);
            setLocalMax(b);
          }}
          onChangeEnd={
            ([a, b]) => {
              onMinChange(a);
              onMaxChange(b);
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
