import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { MdEdit } from 'react-icons/md';

const TimerCard = () => {
    const [time, setTime] = useState(0);
    const [fastingType, setFastingType] = useState(16);
    const [progress, setProgress] = useState(0);
    const [timerStopped, setTimerStopped] = useState(
        new Date('2021-04-02 22:30').getTime() + fastingType * 60 * 60 * 1000 > new Date()
            ? false
            : true
    );

    function msToTime(duration) {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
    }

    let timer;

    useEffect(() => {
        if (!timerStopped) {
            timer = setTimeout(() => {
                const date = new Date();
                const endTimeDiff =
                    new Date(
                        new Date('2021-04-02 22:30').getTime() + fastingType * 60 * 60 * 1000
                    ) - new Date('2021-04-02 22:30');
                setTime(date - new Date('2021-04-02 22:30'));
                if (Math.floor((time / endTimeDiff) * 100) > progress) {
                    const per =
                        Math.floor((time / endTimeDiff) * 100) <= 100
                            ? Math.floor((time / endTimeDiff) * 100)
                            : 100;
                    setProgress(per);
                }
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [time]);

    return (
        <div className="w-96 h-auto bg-white shadow-md rounded-3xl flex flex-col items-center dark:bg-gray-800 dark:text-white py-8">
            <div className="flex item-center space-x-2 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
                <div>16:8</div>
                <div className="flex justify-center items-center">
                    <MdEdit
                        onClick={() => {
                            setFastingType(20);
                            console.log('this is the selected Fasting type');
                        }}
                    />
                </div>
            </div>
            <div>
                <ProgressBar
                    className="absolute"
                    progress={progress}
                    radius={80}
                    strokeWidth={10}
                    strokeColor="#FCD34D"
                    trackStrokeWidth={10}
                    trackStrokeColor="#6D28D9"
                    cut={60}
                    rotate={120}>
                    <div className="flex flex-col items-center justify-center text-center absolute top-0 w-full h-full m-0 dark:text-white">
                        <div className="">Fasting Time</div>
                        <div className="">{msToTime(time)}</div>
                    </div>
                    <div className="text-center relative bottom-10">
                        <button
                            className="bg-purple-700 rounded-full px-3 py-0 text-xs text-white"
                            onClick={() => {
                                setTimerStopped(true);
                                clearTimeout(timer);
                            }}>
                            End
                        </button>
                    </div>
                </ProgressBar>
            </div>
            <div className="flex flex-col justify-around items-center w-full space-y-2">
                <div className="w-full flex justify-around">
                    <div className="md:mb-0 block uppercase tracking-wide text-gray-darker text-xs font-bold">
                        Started
                    </div>
                    <div className="flex  justify-center items-center text-xs">
                        <div>14th Jan, </div>
                        <div>12:30 PM </div>
                        <div className="flex justify-center items-center text-sm">
                            <MdEdit />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-around">
                    <label className="md:mb-0 block uppercase tracking-wide text-gray-darker text-xs font-bold">
                        Fast Ending
                    </label>
                    <div className="flex  justify-center items-center text-xs">
                        <div>14th Jan, </div>
                        <div>12:30 PM </div>
                        <div className="flex justify-center items-center text-sm">
                            <MdEdit />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerCard;
