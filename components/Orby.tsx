import React from 'react';

function Orby({
    style,
    className,
    size = 24,
    src = '/videos/loader_bigScale_181D24.mp4',
}: {
    className?: string;
    size?: number;
    src?: string;
    style?: any;
}) {
    return (
        <video style={style} className={className} muted autoPlay loop width={size} height={size}>
            <source src={src} type="video/mp4" />
        </video>
    );
}

export default Orby;
