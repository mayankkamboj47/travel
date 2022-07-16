/* eslint-disable jsx-a11y/aria-proptypes */
import {
  Button, Menu, MenuList, MenuButton, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack,
  RangeSliderThumb, Flex,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function FilterBar({ filterOptions }) {
  const { toggles, sliders } = filterOptions;
  const toggleButtons = Object.keys(toggles).map((key) => {
    const toggle = toggles[key][1];
    return <ToggleButton onClick={toggle} value={key} key={key} />;
  });
  const sliderButtons = Object.keys(sliders).map((key) => {
    const {
      range, minMax, setRange,
    } = sliders[key];
    const [min, max] = minMax;
    return (
      <DrawerSlider
        title={key}
        key={key}
        range={range}
        min={min}
        max={max}
        setRange={setRange}
      />
    );
  });
  return <Flex gap="1rem" py="0.5rem" position="sticky" top="0" zIndex={10} style={{ backdropFilter: 'blur(10px)' }}>{sliderButtons.concat(toggleButtons)}</Flex>;
}

function ToggleButton({ onClick, value }) {
  const [isOn, setIsOn] = useState(false);
  const colorScheme = isOn ? 'blue' : 'gray';
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
      colorScheme={colorScheme}
    >
      {value}
    </Button>
  );
}

export function DrawerSlider({
  title, min, max, range, setRange,
}) {
  const [localRange, setLocalRange] = useState(range);
  return (
    <Menu>
      <MenuButton as={Button}>{title}</MenuButton>
      <MenuList px="1rem">
        {localRange.join(' - ')}
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={localRange}
          min={min}
          max={max}
          onChange={setLocalRange}
          onChangeEnd={setRange}
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
