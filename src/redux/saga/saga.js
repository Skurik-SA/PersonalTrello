import {all, call, spawn} from "redux-saga/effects"

export function* rootSaga() {
    console.log("Saga works!")
    const sagas = [
        
    ]

    const retrySagas = yield sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break;
                }
                catch (e) {
                    console.log(e)
                }
            }
            }

        )
    )

    yield all(retrySagas)
}