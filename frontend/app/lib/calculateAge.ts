export default function calcAge(dob: Date) {
  const d1 = dob.getDate();
  const m1 = dob.getMonth() + 1;
  const y1 = dob.getFullYear();

  const date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }
  var d = d2 - d1;
  var m = m2 - m1;
  var y = y2 - y1;

  if (y > 0) {
    return `${y} years`;
  } else if (m > 0) {
    return `${m} months`;
  } else {
    return `${d} days`;
  }
}
