import bycrypt from 'bcryptjs';


export const hash =  (password) => {
    const salt = bycrypt.genSaltSync(10);
    const hashedPas = bycrypt.hashSync(password, salt);
    return hashedPas;
}

export const compare = (password, hashedPas) => {
    const isMatch = bycrypt.compareSync(password, hashedPas);
    console.log(isMatch)
    return isMatch;
}