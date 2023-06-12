import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/ChatBoxContainer.module.scss';

enum MsgType {
    OneBrain = 'them',
    Me = 'me',
    Trigger = 'trigger',
}

// { user: MsgType.Me, text: 'Can you show me which doors have a high propensity to purchase KitKat in any SKU?' },
// { user: MsgType.OneBrain, text: 'Here you are, the highlighted 452 doors out of 8,200 have a high propensity to purchase KitKat in any SKU' },
// { user: MsgType.Me, text: 'Can you show me how you would target these? I want you to use promos, rep visits, calls from the call center, and rewards points.' },
// { user: MsgType.OneBrain, text: 'I have segmented each group of doors for you.' },
// { user: MsgType.Me, text: 'Can you create a messaging strategy that targets these doors with push messages? I want to target Doors that already buy Kitkats to purchase more KitKat.' },
// { user: MsgType.OneBrain, text: 'Here is your strategy.' },
// { user: MsgType.Me, text: 'Now create a messaging strategy, for the doors that do not buy KitKat but have a high propensity to buy.' },
// { user: MsgType.OneBrain, text: 'Here is your strategy.' },

let seeds = [
    { user: MsgType.OneBrain, text: 'What would you like to know?' },
    {
        user: MsgType.Me,
        text: 'I have several strategies running in Quito, can you show them to me?',
    },
    { user: MsgType.OneBrain, text: 'Here you are.' },
    { user: MsgType.Me, text: 'What can I do to improve the performance of strategy 3?' },
    {
        user: MsgType.OneBrain,
        text: 'The goal of the strategy was to increase KitKat coverage by 5%. To meet this goal, BDRs would need to visit 10 different doors in a day. Currently they are visiting only 6 doors per day. You might be able to meet your goal by creating a push messaging campaign to all doors in Quito. Here is the updated strategy for you to:',
    },
    {
        user: MsgType.Me,
        text: 'For all of the KitKat strategies running in Ecuador, can you show me what demand is like compared to this time last year?',
    },
    { user: MsgType.OneBrain, text: 'Here you are.' },
    {
        user: MsgType.Me,
        text: 'Based on the strategies that were successful last month, can you create multi-region strategies  for KitKat that could exceed a 4% volume increase over this time last year',
    },
    {
        user: MsgType.OneBrain,
        text: 'Here are the strategies that I would recommend for Quito and Guayaquil.',
    },
    { user: MsgType.Me, text: 'Can you explain why the strategies are different for each region?' },
    {
        user: MsgType.OneBrain,
        text: 'At this time of the year, the demand is different for Quito than it is for Guayaquil. Would you like to run these strategies?',
    },
];

seeds = seeds.map((seed, i) => ({ ...seed, id: i + 1 }));

function ChatBox() {
    const [messages, setMessages] = useState<any>(seeds);
    const [lastRemovedIndex, setLastRemovedIndex] = useState<any>(null);

    function addMessage() {
        let index = Math.floor(Math.random() * messages.length);
        let newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;
        let newMessage = {
            id: newId,
            user: Math.random() > 0.5 ? 'me' : 'them',
            text: "Your mom said it's time to come home",
        };

        setLastRemovedIndex(null);
        setMessages([...messages.slice(0, index), newMessage, ...messages.slice(index)]);
    }

    function removeMessage(message) {
        setLastRemovedIndex(messages.indexOf(message));
        setMessages(messages => messages.filter(m => m.id !== message.id));
    }

    let animatingMessages = lastRemovedIndex !== null ? messages.slice(lastRemovedIndex) : [];

    return (
        <div className={styles.chatBox}>
            <div className="font-semibold font-manrope text-primary-50 text-gray-900">
                <div className={styles.chatContainer}>
                    <ul className="w-full space-y-1 mt-4 text-sm">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {messages.map(message => (
                                <motion.li
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        default: { duration: 0.15 },
                                        layout: {
                                            type: 'spring',
                                            bounce: 0.4,
                                            // duaration: 1,
                                            duration: animatingMessages.includes(message)
                                                ? 0.15 * animatingMessages.indexOf(message) + 0.85
                                                : 1,
                                        },
                                    }}
                                    className="flex"
                                    style={{
                                        originX: message.user === MsgType.Me ? 1 : 0,
                                        // lineHeight: '50px',
                                        // originY: 0,
                                    }}
                                    key={message.id}
                                >
                                    <button
                                        // onClick={() => removeMessage(message)}
                                        className={`${
                                            message.user === MsgType.Me
                                                ? 'mr-auto'
                                                : 'mr-auto'
                                        } font-manrope text-left`}
                                    >
                                        {message.text}
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
