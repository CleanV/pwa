export default function checkUsername(inputString: string) {
    var alphanumericRegex = /^[a-zA-Z0-9_]+$/;
    return alphanumericRegex.test(inputString);
}