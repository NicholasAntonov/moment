import { createLocal } from '../create/local';
import { createUTC } from '../create/utc';
import { createInvalid } from '../create/valid';
import { isMoment } from './constructor';
import { min, max } from './min-max';
import { now } from './now';
import momentPrototype from './prototype';
import isNumber from '../utils/is-number';
import toInt from '../utils/to-int';

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    var offsetRegex = /^(\-)?(\d{2}):?(\d{2})?$/;
    var last = arguments[arguments.length - 1];
    var match = null;
    var offset = null;

    if (isNumber(last)) {
        offset = last;
    }

    if (!!(match = offsetRegex.exec(last))) {
        var sign = (match[1] === '-') ? -1 : 1;
        offset = sign * (toInt(match[2]) * 60) + toInt(match[3]);
    }

    if (offset) {
        return createLocal
            .apply(null, Array.prototype.slice.call(arguments, 0, arguments.length - 1))
            .add(offset, 'minutes')
            .utcOffset(offset);
    }

    return createLocal.apply(null, arguments).parseZone();
}

export {
    now,
    min,
    max,
    isMoment,
    createUTC,
    createUnix,
    createLocal,
    createInZone,
    createInvalid,
    momentPrototype
};
