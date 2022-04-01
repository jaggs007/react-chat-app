export function getInitials (fullName) {
  console.log({ fullName })
  let [ firstName = '', lastName = '' ] = fullName.split(' ');
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
}