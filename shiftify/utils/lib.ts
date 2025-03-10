import { Shift } from './types';

export function formatTime(time: number) {
  const date = new Date(time);
  const fomatedTime = date.getHours() + ':' + (date.getMinutes() == 0 ? '00' : date.getMinutes());
  return fomatedTime;
}

export function getBookingStatus(
  shift: Shift,
  shifts: Shift[]
): 'Booked' | 'Available' | 'Overlapping' {
  if (shift.booked === true) return 'Booked';
  const bookedShifts = shifts.filter((s) => s.booked === true);
  const overlappingShift = bookedShifts.find(
    (s) => s.startTime < shift.endTime && s.endTime > shift.startTime
  );
  if (overlappingShift) return 'Overlapping';
  return 'Available';
}


export const greenSpinnerXML = `
<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#16A64D">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"/>
            </path>
        </g>
    </g>
</svg>
`

export const redSpinnerXML = `
<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#E2006A">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"/>
            </path>
        </g>
    </g>
</svg>`


const  primaryPink = "#E2006A"
const secondaryPink = "#FE93B#"
const tertiaryPink = "#EED2DF"
const primaryGreen = "#16A64D"
const secondaryGreen = "#55CB82"
const tertiaryGreen = "#CAEFD8"
const blue = "#004FB4"