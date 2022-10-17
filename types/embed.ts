// authored by me, but somewhat inspired by exodust
// reading notes: S = string, E = embed, H = head, T = tail, SE = subembed
export type HasEmbed<S extends string, E extends string> = 
S extends `${infer H},${infer T}`       // if we have multiple embeds at the top level
	? H extends `${E}.${string}`        // check if the first begins with our embed with a .
		? true				
		: H extends E                   // if it doesn't, check if the first is the embed
			? true                      // return - we do have it
			: HasEmbed<T, E>            // check other top level embeds
	: S extends `${E}.${string}`        // similar logic if there is only one top level
		? true
		: S extends E
			? true
			: false;                    // except false if there is nothing left to check

export type SubEmbeds<S extends string, E extends string> = 
S extends `${infer H},${infer T}`       // if there are multiple top-level embeds
	? H extends `${E}.${infer SE}`      // check if the first begins with our embed
		? SubEmbeds<T, E> extends ''    // if it does, add the rest of the embed to the list and get the rest
			? SE                        // avoid trailing comma ,
			: `${SE},${SubEmbeds<T, E>}`
		: SubEmbeds<T, E>               // otherwise just the rest
	: S extends `${E}.${infer SE}`      // similar logic if there's only one top level
		? SE
		: '';                           // except we return nothing if its doesnt have the embed

export type Embeddable<Embed extends string, K extends string, Unembedded, Embedded> =
	HasEmbed<Embed, K> extends true ? Embedded : Unembedded

export type AdditionalEmbed<Embed extends string, K extends string, Embedded> =
	Embeddable<Embed, K, {}, Embedded>;