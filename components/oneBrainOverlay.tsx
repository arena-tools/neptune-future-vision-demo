import Orby from './Orby';
import { helmColors, utcMoment } from '../utils/util'

export const OneBrainOverlay = () => {
    return (
        <div className="flex items-center">
            <Orby
                size={28}
                style={{ mixBlendMode: 'darken' }}
                src="/videos/loader_sphere_light_mode_128x128_EDF2F7.mp4"
            />
            <div className="mr-6 ml-4">
                <div
                    className="font-semibold text-[10px]"
                    style={{ color: helmColors.darkGreyBlue }}
                >
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
