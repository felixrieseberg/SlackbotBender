#Index

**Modules**

* [finance](#module_finance)

**Functions**

* [cumulativeDistribution(idx, length)](#cumulativeDistribution)
* [containsAny(str, items, [returnMatch])](#containsAny)
* [startsWithAny(str, items, [returnMatch])](#startsWithAny)
* [strRight(str, items)](#strRight)
* [randElt(arr, [cdf])](#randElt)
 
<a name="module_finance"></a>
#finance
Finance integration. Reads finance data from Yahoo!  See http://www.jarloo.com/yahoo_finance/ for details.

<a name="cumulativeDistribution"></a>
#cumulativeDistribution(idx, length)
Cumulative distribution function over an array, allows finer tuning of returned results from randElt.

**Params**

- idx `int` - Index of the array you're computing over.  
- length `int` - Length of the array you're computing over.  

**Returns**: `number` - The cumulative probability of choosing an element at or before this array index.  
<a name="containsAny"></a>
#containsAny(str, items, [returnMatch])
True if the string contains any of the substrings in items.

**Params**

- str `String` - String to search.  
- items `Array.<String>` - List of strings to search for.  
- \[returnMatch=false\] `bool` - Whether or not to return the actual matching item from items, or just true.  

**Returns**: `*` - True, or the matching item, depending on returnMatch.  
<a name="startsWithAny"></a>
#startsWithAny(str, items, [returnMatch])
True if the string starts with any of the substrings in items.

**Params**

- str `String` - String to search.  
- items `Array.<String>` - List of strings to search for.  
- \[returnMatch=false\] `bool` - Whether or not to return the actual matching item from items, or just true.  

**Returns**: `*` - True, or the matching item, depending on returnMatch.  
<a name="strRight"></a>
#strRight(str, items)
Extension of underscore.string's strRight to remove a whole list of strings.

**Params**

- str `String` - String to trim right.  
- items `Array.<String>` - Strings to look for and trim.  

**Returns**: `String` - Trimmed string.  
<a name="randElt"></a>
#randElt(arr, [cdf])
Return a random element from an array.

**Params**

- arr `Array` - Array to pick a random result from.  
- \[cdf\] <code>[cumulativeDistribution](#cumulativeDistribution)</code> - CDF over input space.  

**Returns**: `*` - Random element of the array.  
