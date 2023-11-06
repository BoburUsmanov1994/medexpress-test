import {find, get} from "lodash"

export const getDefaultValue = (options, id) => {
    return find(options, (option) => get(option, 'value') == id)
}

export const listToTree = (list) => {
    let map = {},
        tree_node, roots = [],
        i;

    for (i = 0; i < list?.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list?.length; i += 1) {
        tree_node = list[i];
        tree_node.label = tree_node.name;
        if (tree_node.parent?.id !== null && (map[tree_node.parent?.id] === 0 || map[tree_node.parent?.id])) {
            // if you have dangling branches check that map[node.parentId] exists

            list[map[tree_node.parent?.id]].children.push(tree_node);

        } else {
            roots.push(tree_node);
        }
    }
    return roots;
}