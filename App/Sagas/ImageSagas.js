import { put } from 'redux-saga/effects'
import ImageActions from '../Redux/ImageRedux'

// attempts to image
export function * saveImage({ path }) {
    console.tron.log(path)
  if (path === undefined) {
    // dispatch failure
    yield put(ImageActions.imageFailure('WRONG'))
  } else {
    // dispatch successful images
    yield put(ImageActions.imageSuccess(path))
  }
}
