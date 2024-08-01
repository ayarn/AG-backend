module.exports = generateClientId;

function generateClientId(userCount) {
    const currDate = new Date();
    const day = String(currDate.getDate()).padStart(2, "0");
    const month = String(currDate.getMonth() + 1).padStart(2, "0");
    const year = currDate.getFullYear();
    const userNumber = String(userCount + 1).padStart(5, "0");

    const clientId = `AG${userNumber}/${day}/${month}/${year}`;
    return clientId;
}
