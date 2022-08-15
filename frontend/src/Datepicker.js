import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Flex } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";


export function Datepicker({checkInDate, checkOutDate, handleCheckInDate, handleCheckOutDate}){
    return (
        <Flex className="input-container">
          <div>
            <label style={{width: "50%"}}>
            <span class="label" style={{paddingLeft:"0.5rem"}}>Check-in</span>
            <DatePicker
              selected={checkInDate}
              minDate={new Date()}
              onChange={handleCheckInDate}
            />
            </label>
          </div>
          <div>
            <label style={{width: "50%"}}>
              <span class="label" style={{paddingLeft:"0.5rem"}}>Check-out</span>
            <DatePicker
              selected={checkOutDate}
              minDate={checkInDate}
              onChange={handleCheckOutDate}
            />
            </label>
          </div>
        </Flex>
      )
}