import { Button, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import React, { useState } from 'react';
import TimeKeeper from 'react-timekeeper';

type Props = {
    defaultTime: string;
    message1: string;
    message2: string;
}

export const TimePicker: React.FC<Props> = React.forwardRef(({defaultTime,message1,message2}, ref: React.LegacyRef<HTMLInputElement>) => {
    const [time, setTime] = useState(defaultTime)
    const [showTime, setShowTime] = useState(false)

    return (
        <div>
            <Stat mt={5}>
                <StatLabel>{message1}</StatLabel>
                <StatNumber ref={ref}>{time}</StatNumber>
            </Stat>
            {showTime &&
                <TimeKeeper
                    time={time}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }
            {!showTime &&
            <Button width="full" mt={4} onClick={() => setShowTime(true)}>
                {message2}
            </Button>
            }
        </div>
    )
})

TimePicker.displayName = "TimePicker";