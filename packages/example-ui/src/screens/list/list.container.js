import fromFunction from 'callbag-from-function'
import of from 'callbag-of'
import { pipe, combine, map, scan, merge, fromPromise, flatten } from 'callbag-basics'
import mapPropsCallbag from 'map-props-callbag'
import List from './list'

export default mapPropsCallbag((props$) => {
  const addUser = fromFunction(() => ({ type: 'ADD_USER' }))

  const fetchUser$ = pipe(
    addUser.source,
    map(() => pipe(
      fromPromise(fetch('http://localhost:8080/api/new-user').then(raw => raw.json())),
      map(user => ({ type: 'ADD_USER', payload: user })),
    )),
    flatten,
  )

  const actions$ = merge(
    of({ type: 'INIT' }),
    fetchUser$,
  )

  const state$ = pipe(
    actions$,
    scan(
      (state, action) => {
        const { type, payload } = action

        switch (type) {
          case 'ADD_USER': return [...state, payload]
          default: return state
        }
      },
      [{ name: 'Delphine' }],
    ),
  )

  return pipe(
    combine(
      props$,
      state$,
    ),
    map(([props, state]) => ({
      ...props,
      users: state,
      addUser: addUser.emitter,
    }))
  )
})(List)
