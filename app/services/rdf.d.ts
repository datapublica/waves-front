interface Triple {
	subject: RDFNode;
	predicate: RDFNode;
	object: RDFNode;
	equals(otherTriple: Triple): boolean;
}

interface Graph extends Array<Triple> {
    new (init?: Array<Triple>) : Graph;
	length: number;
	actions: TripleAction[];
	add(triple: Triple): Graph;
	remove(triple: Triple): Graph;
	removeMatches(subject: any, predicate: any, object: any): Graph;
	toArray(): Triple[];
	match(subject: any, predicate: any, object: any, limit?: number): Array<Triple>;
	merge(graph: Graph): Graph;
	addAll(graph: Graph): Graph;
	addAction(action: TripleAction, run?: boolean): Graph;
}

interface RDFNode {
	nominalValue: any;
	interfaceName: string;
	toString(): string;
	valueOf(): any;
	toNT(): string;
	equals(tocompare: any): boolean;
}

interface NamedNode extends RDFNode {
	nominalValue: any;
}

interface BlankNode extends RDFNode {
	nominalValue: any;
}

interface Literal extends RDFNode {
	nominalValue: string;
	language: string;
	datatype: NamedNode;
	valueOf(): any;
}

interface TripleFilter {
	test(triple: Triple): boolean;
}

interface TripleCallback {
	run(triple: Triple, graph: Graph): void;
}

interface TripleAction {
	test: TripleFilter;
	action: TripleCallback;
	run(triple: Triple, graph: Graph): void;
}

interface PrefixMap {
	get(prefix: string): string;
	set(prefix: string, iri: string): void;
	remove(prefix: string): void;
	resolve(curie: string): string;
	shrink(iri: string): string;
	setDefault(iri: string): void;
	addAll(prefixes: PrefixMap, override?: boolean): PrefixMap;
}

interface TermMap {
	get(term: string): string;
	set(term: string, iri: string): void;
	remove(term: string): void;
	resolve(term: string): string;
	shrink(iri: string): string;
	setDefault(iri: string): void;
	addAll(terms: TermMap, override?: boolean): TermMap;
}

interface Profile {
	prefixes: PrefixMap;
	terms: TermMap;
	resolve(toresolve: string): string;
	setDefaultVocabulary(iri: string): void;
	setDefaultPrefix(iri: string): void;
	setTerm(term: string, iri: string): void;
	setPrefix(prefix: string, iri: string): void;
	importProfile(profile: Profile, override?: boolean): Profile;
}

interface RDFEnvironment extends Profile {
	createBlankNode(): BlankNode;
	createNamedNode(value: string): NamedNode;
	createLiteral(value: string, language?: string, datatype?: NamedNode): Literal;
	createTriple(subject: RDFNode, predicate: RDFNode, object: RDFNode): Triple;
	createGraph(triples?: Triple): Graph;
	createAction(test: TripleFilter, action: TripleCallback): TripleAction;
	createProfile(empty?: boolean): Profile;
	createTermMap(empty?: boolean): TermMap;
	createPrefixMap(empty?: boolean): PrefixMap;
}

interface DataParser {
	processorGraph: Graph;
	parse(toparse: any, callback: ParserCallback, base?: string, filter?: TripleFilter, graph?: Graph): boolean;
	process(toparse: any, callback: ProcessorCallback, base?: string, filter?: TripleFilter): boolean;
}

interface DataSerializer {
	serialize(graph: Graph): any;
}

interface ParserCallback {
	run(graph: Graph): void;
}

interface ProcessorCallback {
	run(triple: Triple): void;
}