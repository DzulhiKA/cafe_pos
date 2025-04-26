export function logSuccess(message : string) {
    console.log(`\x1b[32m ✅ ${message} \x1b[0m`)
}

export function logError(message : string, ...err : Array<unknown>) {
    console.log(`\x1b[31m ❌ ${message} \x1b[0m`, err)
}

export function logWarning(message : string) {
    console.log(`\x1b[93m ⚠️ ${message} \x1b[0m`)
}