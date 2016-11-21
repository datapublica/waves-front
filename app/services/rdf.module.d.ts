interface RDF {
    Triple?: Triple;
    RDFNode?: RDFNode;
    NamedNode?: NamedNode;
    BlankNode?: BlankNode;
    Literal?: Literal;
    Graph?: Graph;
    TripletGraph?: Graph;

    Profile?: Profile;
    RDFEnvironment?: RDFEnvironment;

    TurtleParser?: Function;

    DataSerializer?: Graph;
    setObjectProperties?: any;
    setStringProperties?: any;
    setArrayProperties?: any;
    setBooleanProperties?: any;
    setDateProperties?: any;
    setNumberProperties?: any;
    environment?: any;
    setBuiltins?: any;
    ref?: any;
    parse?: any;
    ns?(key?: String): Function;
    rdfsns?(key?: String): String;
    rdfns?(key?: String): String;
    xsdns?(key?: String): String;
    utils?: any;
}
