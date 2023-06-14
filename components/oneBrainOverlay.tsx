import Orby from './Orby';
import { helmColors, utcMoment } from '../utils/util';
import { Image } from '@mantine/core';

const ArenaLogo = () => {
    return <Image src="arenalogo.png" width={35} height={35} alt="logo" />;
};

export const OneBrainOverlay = () => {
    return (
        <div className="one-brain-overlay flex items-center">
            <Orby
                size={28}
                style={{ mixBlendMode: 'darken' }}
                src="/videos/loader_sphere_light_mode_128x128_EDF2F7.mp4"
                className="orby-video"
            />
            <div className="mr-8 ml-2">
                <div
                    className="font-semibold text-[10px]"
                    style={{ color: helmColors.darkGreyBlue }}
                >
                    Powered By
                    <br />
                    Arena - One Brain
                </div>

                {/* {lastUpdatedAt && (
                    <div className="font-normal text-[10px]" style={{ color: '#81859B' }}>
                        Last Updated - {utcMoment(lastUpdatedAt).format('ddd, MMM D h:mmA [UTC]')}
                    </div>
                )} */}
            </div>
        </div>
    );
};
