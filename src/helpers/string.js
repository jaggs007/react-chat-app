export function getInitials (fullName) {
  let [ firstName = '', lastName = '' ] = fullName.split(' ');
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
}