



const extractIds = (Objects) => {
    const ids = []
    Objects.forEach( element => ids.push(element.classId));
    return ids;
}

module.exports = { extractIds }