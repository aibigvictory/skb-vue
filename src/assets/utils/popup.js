import store from "@/store";

const popup_state = store.state.popup_state

const change_popup_state = (target, type, state, func) => {
    target[type] = state

    // if (popup_type == 'rename' && state == false) {
    //     group_data.state = !group_data.state
    // }

    // group_data = group
    if (func) func()
}

export {
    change_popup_state
}