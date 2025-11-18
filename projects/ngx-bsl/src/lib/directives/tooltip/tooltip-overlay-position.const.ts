import { ConnectedPosition } from '@angular/cdk/overlay';
import { TooltipPosition } from './tooltip-position.enum';

export const TOOLTIP_OVERLAY_POSITION: Record<TooltipPosition, ConnectedPosition> = {
    TOP: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
    },
    BOTTOM: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
    },
    LEFT: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
    },
    RIGHT: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
    },
};
