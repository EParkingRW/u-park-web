/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Transition from '../Transition';

const UserMenu = ({profile}:any) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if(!dropdown.current || !trigger.current){
                return;
            }
            if ( !dropdownOpen || dropdown.current.contains(target) ||
                trigger.current.contains(target)
            ){
                return;
            }

            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [dropdownOpen]);

    return (
        <div className="relative inline-flex">
            <div ref={trigger}
                 aria-haspopup="true"
                 onClick={() => setDropdownOpen(!dropdownOpen)}
                 aria-expanded={dropdownOpen}
                className={"text-white flex items-center justify-between gap-1 bg-primary py-1 px-2 rounded-2xl min-w-[272px]"}>
                <span className="material-symbols-outlined rounded-full px-3 py-3 bg-white/50 text-white">person</span>
                <span>
                {profile?.userName}
            </span>
                <button className="material-symbols-outlined rounded px-1 py-1 text-3xl text-white">arrow_drop_down</button>
            </div>

            <Transition
                className="origin-top-right z-50 w-full absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    className={"w-full h-full"}
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                        <div className="font-medium text-slate-800">C park.</div>
                    </div>
                    <ul>
                        <li>
                            <Link href="/dashboard">
                                <button
                                    className="font-medium text-sm text-primary hover:text-indigo-600 flex items-center py-1 px-3"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    dashboard
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <button
                                    className="font-medium text-sm text-primary hover:text-indigo-600 flex items-center py-1 px-3"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    Sign Out
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
};

export default UserMenu;
