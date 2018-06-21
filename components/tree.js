import React from "react";
import Tree from "react-ui-tree";
import data from "../synsets.json";

function filter(synsetInput, text) {
  const synset = JSON.parse(JSON.stringify(synsetInput));
  synset.children = synset.children.filter(function iter(s) {
    if (s.name.indexOf(text) > -1) {
      return true;
    }
    if (!Array.isArray(s.children)) {
      return false;
    }
    const temp = s.children.filter(iter);
    if (temp.length) {
      s.children = temp;
      return true;
    }
  });

  if (synset) {
    return recalculate(synset);
  }

  return synset;
}

function recalculate(synset) {
  const children = synset.children.map(c => recalculate(c));
  if (children.length > 0) {
    synset.size = children.length + children.reduce((e, i) => e + i.size, 0);
  }
  return synset;
}

export default class MyApp extends React.Component {
  constructor() {
    super();

    this.state = {
      tree: data,
      query: ""
    };
  }

  renderNode = node => {
    return (
      <span className="node">
        {node.name} ({node.size})
      </span>
    );
  };

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

  handleQuery = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSearch = () => {
    this.setState({
      tree: this.state.query ? filter(data, this.state.query) : data
    });
  };

  render() {
    const { tree, query } = this.state;
    return (
      <div>
        <div className="my-4">
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight"
            onChange={this.handleQuery}
            value={query}
            type="text"
          />
          <button
            onClick={this.handleSearch}
            className="bg-blue hover:bg-blue-dark text-white mx-4 py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        {tree ? (
          <Tree
            paddingLeft={20}
            tree={tree}
            onChange={this.handleChange}
            renderNode={this.renderNode}
          />
        ) : null}
        <style jsx global>{`
          .f-no-select {
            -webkit-user - select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .m-tree {
            position: relative;
            overflow: hidden;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .m-draggable {
            position: absolute;
            opacity: 0.8;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .m-node.placeholder > * {
            visibility: hidden;
          }
          .m-node.placeholder {
            border: 1px dashed #ccc;
          }
          .m-node .inner {
            position: relative;
            padding-left: 10px;
          }
          .m-node .collapse {
            position: absolute;
            left: 0;
            cursor: pointer;
          }
          .m-node .caret-right:before {
            content: "▸";
          }
          .m-node .caret-down:before {
            content: "▾";
          }
        `}</style>
      </div>
    );
  }
}
