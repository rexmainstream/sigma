export default function random_number(min, max) {
    return Math.round(Math.random()*(max - min) + min)
}