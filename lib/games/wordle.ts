import { getFormattedDate } from '@/lib/utils/date';

export interface WordleResponse {
  id: number;
  solution: string;
  print_date: string;
  days_since_launch: number;
  editor: string;
}

// Common 5-letter words list for validation
export let VALID_WORDS = [
  'aback', 'abase', 'abate', 'abbey', 'abbot', 'abhor', 'abide', 'abled', 'abode', 'abort',
  'about', 'above', 'abuse', 'abyss', 'acorn', 'acrid', 'actor', 'acute', 'adage', 'adapt',
  'adept', 'admin', 'admit', 'adobe', 'adopt', 'adore', 'adorn', 'adult', 'affix', 'afire',
  'afoot', 'afoul', 'after', 'again', 'agape', 'agate', 'agent', 'agile', 'aging', 'aglow',
  'agony', 'agree', 'ahead', 'aider', 'aisle', 'alarm', 'album', 'alert', 'algae', 'alibi',
  'alien', 'align', 'alike', 'alive', 'allay', 'alley', 'allot', 'allow', 'alloy', 'aloft',
  'alone', 'along', 'aloof', 'aloud', 'alpha', 'altar', 'alter', 'amass', 'amaze', 'amber',
  'amble', 'amend', 'amiss', 'amity', 'among', 'ample', 'amply', 'amuse', 'angel', 'anger',
  'angle', 'angry', 'angst', 'anime', 'ankle', 'annex', 'annoy', 'annul', 'anode', 'antic',
  'anvil', 'aorta', 'apart', 'aphid', 'aping', 'apnea', 'apple', 'apply', 'apron', 'aptly',
  'arbor', 'ardor', 'arena', 'argue', 'arise', 'armor', 'aroma', 'arose', 'array', 'arrow',
  'arson', 'artsy', 'ascot', 'ashen', 'aside', 'askew', 'assay', 'asset', 'atoll', 'atone',
  'attic', 'audio', 'audit', 'augur', 'aunty', 'avail', 'avert', 'avian', 'avoid', 'await',
  'awake', 'award', 'aware', 'awash', 'awful', 'awoke', 'axial', 'axiom', 'axion', 'azure',
  'bacon', 'badge', 'badly', 'bagel', 'baggy', 'baker', 'baler', 'balmy', 'banal', 'banjo',
  'barge', 'baron', 'basal', 'basic', 'basil', 'basin', 'basis', 'baste', 'batch', 'bathe',
  'baton', 'batty', 'bawdy', 'bayou', 'beach', 'beady', 'beard', 'beast', 'beech', 'beefy',
  'befit', 'began', 'begat', 'beget', 'begin', 'begun', 'being', 'belch', 'belie', 'belle',
  'belly', 'below', 'bench', 'beret', 'berry', 'berth', 'beset', 'betel', 'bevel', 'bezel',
  'bible', 'bicep', 'biddy', 'bigot', 'bilge', 'billy', 'binge', 'bingo', 'biome', 'birch',
  'birth', 'bison', 'bitty', 'black', 'blade', 'blame', 'bland', 'blank', 'blare', 'blast',
  'blaze', 'bleak', 'bleat', 'bleed', 'bleep', 'blend', 'bless', 'blimp', 'blind', 'blink',
  'bliss', 'blitz', 'bloat', 'block', 'bloke', 'blond', 'blood', 'bloom', 'blown', 'bluer',
  'bluff', 'blunt', 'blurb', 'blurt', 'blush', 'board', 'boast', 'bobby', 'boney', 'bongo',
  'bonus', 'booby', 'boost', 'booth', 'booty', 'booze', 'boozy', 'borax', 'borne', 'bosom',
  'bossy', 'botch', 'bough', 'boule', 'bound', 'bowel', 'boxer', 'brace', 'braid', 'brain',
  'brake', 'brand', 'brash', 'brass', 'brave', 'bravo', 'brawl', 'brawn', 'bread', 'break',
  'breed', 'briar', 'bribe', 'brick', 'bride', 'brief', 'brine', 'bring', 'brink', 'briny',
  'brisk', 'broad', 'broil', 'broke', 'brood', 'brook', 'broom', 'broth', 'brown', 'brunt',
  'brush', 'brute', 'buddy', 'budge', 'buggy', 'bugle', 'build', 'built', 'bulge', 'bulky',
  'bully', 'bunch', 'bunny', 'burly', 'burnt', 'burst', 'bused', 'bushy', 'butch', 'butte',
  'buxom', 'buyer', 'bylaw', 'cabal', 'cabby', 'cabin', 'cable', 'cacao', 'cache', 'cacti',
  'caddy', 'cadet', 'cagey', 'cairn', 'camel', 'cameo', 'canal', 'candy', 'canny', 'canoe',
  'canon', 'caper', 'caput', 'carat', 'cargo', 'carol', 'carry', 'carve', 'caste', 'catch',
  'cater', 'catty', 'caulk', 'cause', 'cavil', 'cease', 'cedar', 'cello', 'chafe', 'chaff',
  'chain', 'chair', 'chalk', 'champ', 'chant', 'chaos', 'chard', 'charm', 'chart', 'chase',
  'chasm', 'cheap', 'cheat', 'check', 'cheek', 'cheer', 'chess', 'chest', 'chick', 'chide',
  'chief', 'child', 'chili', 'chill', 'chime', 'china', 'chirp', 'chock', 'choir', 'choke',
  'chord', 'chore', 'chose', 'chuck', 'chump', 'chunk', 'churn', 'chute', 'cider', 'cigar',
  'cinch', 'circa', 'civic', 'civil', 'clack', 'claim', 'clamp', 'clang', 'clank', 'clash',
  'clasp', 'class', 'clean', 'clear', 'cleat', 'cleft', 'clerk', 'click', 'cliff', 'climb',
  'cling', 'clink', 'cloak', 'clock', 'clone', 'close', 'cloth', 'cloud', 'clout', 'clove',
  'clown', 'cluck', 'clued', 'clump', 'clung', 'coach', 'coast', 'cobra', 'cocoa', 'colon',
  'color', 'comet', 'comfy', 'comic', 'comma', 'conch', 'condo', 'conic', 'copse', 'coral',
  'corer', 'corny', 'couch', 'cough', 'could', 'count', 'coupe', 'court', 'coven', 'cover',
  'covet', 'covey', 'cower', 'coyly', 'crack', 'craft', 'cramp', 'crane', 'crank', 'crash',
  'crass', 'crate', 'crave', 'crawl', 'craze', 'crazy', 'creak', 'cream', 'credo', 'creed',
  'creek', 'creep', 'creme', 'crepe', 'crept', 'cress', 'crest', 'crick', 'cried', 'crier',
  'crime', 'crimp', 'crisp', 'croak', 'crock', 'crone', 'crony', 'crook', 'cross', 'croup',
  'crowd', 'crown', 'crude', 'cruel', 'crumb', 'crump', 'crush', 'crust', 'crypt', 'cubic',
  'cumin', 'curio', 'curly', 'curry', 'curse', 'curve', 'curvy', 'cutie', 'cyber', 'cycle',
  'cynic', 'daddy', 'daily', 'dairy', 'daisy', 'dally', 'dance', 'dandy', 'datum', 'daunt',
  'dealt', 'death', 'debar', 'debit', 'debug', 'debut', 'decal', 'decay', 'decor', 'decoy',
  'decry', 'defer', 'deign', 'deity', 'delay', 'delta', 'delve', 'demon', 'demur', 'denim',
  'dense', 'depot', 'depth', 'derby', 'deter', 'detox', 'deuce', 'devil', 'diary', 'dicey',
  'digit', 'dilly', 'dimly', 'diner', 'dingo', 'dingy', 'diode', 'dirge', 'dirty', 'disco',
  'ditch', 'ditto', 'ditty', 'diver', 'dizzy', 'dodge', 'dodgy', 'dogma', 'doing', 'dolly',
  'donor', 'donut', 'dopey', 'doubt', 'dough', 'dowdy', 'dowel', 'downy', 'dowry', 'dozen',
  'draft', 'drain', 'drake', 'drama', 'drank', 'drape', 'drawl', 'drawn', 'dread', 'dream',
  'dress', 'dried', 'drier', 'drift', 'drill', 'drink', 'drive', 'droit', 'droll', 'drone',
  'drool', 'droop', 'dross', 'drove', 'drown', 'druid', 'drunk', 'dryer', 'dryly', 'duchy',
  'dully', 'dummy', 'dumpy', 'dunce', 'dusky', 'dusty', 'dutch', 'duvet', 'dwarf', 'dwell',
  'dwelt', 'dying', 'eager', 'eagle', 'early', 'earth', 'easel', 'eaten', 'eater', 'ebony',
  'eclat', 'edict', 'edify', 'eerie', 'egret', 'eight', 'eject', 'eking', 'elate', 'elbow',
  'elder', 'elect', 'elegy', 'elfin', 'elide', 'elite', 'elope', 'elude', 'email', 'embed',
  'ember', 'emcee', 'empty', 'enact', 'endow', 'enema', 'enemy', 'enjoy', 'ennui', 'ensue',
  'enter', 'entry', 'envoy', 'epoch', 'epoxy', 'equal', 'equip', 'erase', 'erect', 'erode',
  'error', 'erupt', 'essay', 'ester', 'ether', 'ethic', 'ethos', 'etude', 'evade', 'event',
  'every', 'evict', 'evoke', 'exact', 'exalt', 'excel', 'exert', 'exile', 'exist', 'expel',
  'extol', 'extra', 'exult', 'eying', 'fable', 'facet', 'faint', 'fairy', 'faith', 'false',
  'fancy', 'fanny', 'farce', 'fatal', 'fatty', 'fault', 'fauna', 'favor', 'feast', 'fecal',
  'feign', 'fella', 'felon', 'femme', 'femur', 'fence', 'feral', 'ferry', 'fetal', 'fetch',
  'fetid', 'fetus', 'fever', 'fewer', 'fiber', 'ficus', 'field', 'fiend', 'fiery', 'fifth',
  'fifty', 'fight', 'filer', 'filet', 'filly', 'filmy', 'filth', 'final', 'finch', 'finer',
  'first', 'fishy', 'fixer', 'fizzy', 'fjord', 'flack', 'flail', 'flair', 'flake', 'flaky',
  'flame', 'flank', 'flare', 'flash', 'flask', 'fleck', 'fleet', 'flesh', 'flick', 'flier',
  'fling', 'flint', 'flirt', 'float', 'flock', 'flood', 'floor', 'flora', 'floss', 'flour',
  'flout', 'flown', 'fluff', 'fluid', 'fluke', 'flume', 'flung', 'flunk', 'flush', 'flute',
  'flyer', 'foamy', 'focal', 'focus', 'foggy', 'foist', 'folio', 'folly', 'foray', 'force',
  'forge', 'forgo', 'forte', 'forth', 'forty', 'forum', 'found', 'foyer', 'frail', 'frame',
  'frank', 'fraud', 'freak', 'freed', 'freer', 'fresh', 'friar', 'fried', 'frill', 'frisk',
  'fritz', 'frock', 'frond', 'front', 'frost', 'froth', 'frown', 'froze', 'fruit', 'fudge',
  'fugue', 'fully', 'fungi', 'funky', 'funny', 'furor', 'furry', 'fussy', 'fuzzy', 'gaffe',
  'gaily', 'gamer', 'gamma', 'gamut', 'gassy', 'gaudy', 'gauge', 'gaunt', 'gauze', 'gavel',
  'gawky', 'gayer', 'gayly', 'gazer', 'gecko', 'geeky', 'geese', 'genie', 'genre', 'ghost',
  'ghoul', 'giant', 'giddy', 'gipsy', 'girly', 'girth', 'given', 'giver', 'gland', 'glade',
  'glare', 'glass', 'glaze', 'gleam', 'glean', 'glide', 'glint', 'gloat', 'globe', 'gloom',
  'glory', 'gloss', 'glove', 'glyph', 'gnash', 'gnome', 'godly', 'going', 'golem', 'golly',
  'gonad', 'goner', 'goody', 'gooey', 'goofy', 'goose', 'gorge', 'gouge', 'gourd', 'grace',
  'grade', 'graft', 'grail', 'grain', 'grand', 'grant', 'grape', 'graph', 'grasp', 'grass',
  'grate', 'grave', 'gravy', 'graze', 'great', 'greed', 'green', 'greet', 'grief', 'grill',
  'grime', 'grimy', 'grind', 'gripe', 'groan', 'groin', 'groom', 'grope', 'gross', 'group',
  'grout', 'grove', 'growl', 'grown', 'gruel', 'gruff', 'grunt', 'guard', 'guava', 'guess',
  'guest', 'guide', 'guild', 'guile', 'guilt', 'guise', 'gulch', 'gully', 'gumbo', 'gummy',
  'guppy', 'gusto', 'gusty', 'gypsy', 'habit', 'hairy', 'halve', 'handy', 'happy', 'hardy',
  'harem', 'harpy', 'harry', 'harsh', 'haste', 'hasty', 'hatch', 'hater', 'haunt', 'haute',
  'haven', 'havoc', 'hazel', 'heady', 'heard', 'heart', 'heath', 'heave', 'heavy', 'hedge',
  'hefty', 'heist', 'helix', 'hello', 'hence', 'heron', 'hilly', 'hinge', 'hippo', 'hippy',
  'hitch', 'hoard', 'hobby', 'hoist', 'holly', 'homer', 'honey', 'honor', 'horde', 'horny',
  'horse', 'hotel', 'hotly', 'hound', 'house', 'hovel', 'hover', 'howdy', 'human', 'humid',
  'humor', 'humph', 'humus', 'hunch', 'hunky', 'hurry', 'husky', 'hussy', 'hutch', 'hydro',
  'hyena', 'hymen', 'hyper', 'icily', 'icing', 'ideal', 'idiom', 'idiot', 'idler', 'idyll',
  'igloo', 'iliac', 'image', 'imbue', 'impel', 'imply', 'inane', 'inbox', 'incur', 'index',
  'inept', 'inert', 'infer', 'ingot', 'inlay', 'inlet', 'inner', 'input', 'inter', 'intro',
  'ionic', 'irate', 'irony', 'islet', 'itchy', 'ivory', 'jaunt', 'jazzy', 'jelly', 'jerky',
  'jetty', 'jewel', 'jiffy', 'joint', 'joist', 'joker', 'jolly', 'joust', 'judge', 'juice',
  'juicy', 'jumbo', 'jumpy', 'junta', 'junto', 'juror', 'kappa', 'karma', 'kayak', 'kebab',
  'khaki', 'kinky', 'kiosk', 'kitty', 'knack', 'knave', 'knead', 'kneed', 'knelt', 'knife',
  'knock', 'knoll', 'known', 'koala', 'krill', 'label', 'labor', 'laden', 'ladle', 'lager',
  'lance', 'lanky', 'lapel', 'lapse', 'large', 'larva', 'lasso', 'latch', 'later', 'lathe',
  'latte', 'laugh', 'layer', 'leach', 'leafy', 'leaky', 'leant', 'leapt', 'learn', 'lease',
  'leash', 'least', 'leave', 'ledge', 'leech', 'leery', 'lefty', 'legal', 'leggy', 'lemon',
  'lemur', 'leper', 'level', 'lever', 'libel', 'liege', 'light', 'liken', 'lilac', 'limbo',
  'limit', 'linen', 'liner', 'lingo', 'lipid', 'lithe', 'liver', 'livid', 'llama', 'loamy',
  'loath', 'lobby', 'local', 'locus', 'lodge', 'lofty', 'logic', 'login', 'loopy', 'loose',
  'lorry', 'loser', 'louse', 'lousy', 'lover', 'lower', 'lowly', 'loyal', 'lucid', 'lucky',
  'lumen', 'lumpy', 'lunar', 'lunch', 'lunge', 'lupus', 'lurch', 'lurid', 'lusty', 'lying',
  'lymph', 'lyric', 'macaw', 'macho', 'macro', 'madam', 'madly', 'mafia', 'magic', 'magma',
  'maize', 'major', 'maker', 'mambo', 'mamma', 'mammy', 'manga', 'mange', 'mango', 'mangy',
  'mania', 'manic', 'manly', 'manor', 'maple', 'march', 'marry', 'marsh', 'mason', 'masse',
  'match', 'matey', 'mauve', 'maxim', 'maybe', 'mayor', 'mealy', 'meant', 'meaty', 'mecca',
  'medal', 'media', 'medic', 'melee', 'melon', 'mercy', 'merge', 'merit', 'merry', 'metal',
  'meter', 'metro', 'micro', 'midge', 'midst', 'might', 'milky', 'mimic', 'mince', 'miner',
  'minim', 'minor', 'minty', 'minus', 'mirth', 'miser', 'missy', 'mocha', 'modal', 'model',
  'modem', 'mogul', 'moist', 'molar', 'moldy', 'money', 'month', 'moody', 'moose', 'moral',
  'moron', 'morph', 'mossy', 'motel', 'motif', 'motor', 'motto', 'moult', 'mound', 'mount',
  'mourn', 'mouse', 'mouth', 'mover', 'movie', 'mower', 'mucky', 'mucus', 'muddy', 'mulch',
  'mummy', 'munch', 'mural', 'murky', 'mushy', 'music', 'musky', 'musty', 'myrrh', 'nadir',
  'naive', 'nanny', 'nasal', 'nasty', 'natal', 'naval', 'navel', 'needy', 'neigh', 'nerdy',
  'nerve', 'never', 'newer', 'newly', 'nicer', 'niche', 'niece', 'night', 'ninja', 'ninny',
  'ninth', 'noble', 'nobly', 'noise', 'noisy', 'nomad', 'noose', 'north', 'nosey', 'notch',
  'novel', 'nudge', 'nurse', 'nutty', 'nylon', 'nymph', 'oaken', 'obese', 'occur', 'ocean', 'octal',
  'octet', 'odder', 'oddly', 'offal', 'offer', 'often', 'olden', 'older', 'olive', 'ombre',
  'omega', 'onion', 'onset', 'opera', 'opine', 'opium', 'optic', 'orbit', 'order', 'organ',
  'other', 'otter', 'ought', 'ounce', 'outdo', 'outer', 'outgo', 'ovary', 'ovate', 'overt',
  'ovine', 'ovoid', 'owing', 'owner', 'oxide', 'ozone', 'paddy', 'pagan', 'paint', 'paler',
  'palsy', 'panel', 'panic', 'pansy', 'papal', 'paper', 'parer', 'parka', 'parry', 'parse',
  'party', 'pasta', 'paste', 'pasty', 'patch', 'patio', 'patsy', 'patty', 'pause', 'payee',
  'payer', 'peace', 'peach', 'pearl', 'pecan', 'pedal', 'penal', 'pence', 'penne', 'penny',
  'perch', 'peril', 'perky', 'pesky', 'pesto', 'petal', 'petty', 'phase', 'phone', 'phony',
  'photo', 'piano', 'picky', 'piece', 'piety', 'piggy', 'pilot', 'pinch', 'piney', 'pinky',
  'pinto', 'piper', 'pique', 'pitch', 'pithy', 'pivot', 'pixel', 'pixie', 'pizza', 'place',
  'plaid', 'plain', 'plait', 'plane', 'plank', 'plant', 'plate', 'plaza', 'plead', 'pleat',
  'plied', 'plier', 'pluck', 'plumb', 'plume', 'plump', 'plunk', 'plush', 'poesy', 'point',
  'poise', 'poker', 'polar', 'polka', 'polyp', 'pooch', 'poppy', 'porch', 'poser', 'posit',
  'posse', 'pouch', 'pound', 'pouty', 'power', 'prank', 'prawn', 'preen', 'press', 'price',
  'prick', 'pride', 'pried', 'prime', 'primo', 'print', 'prior', 'prism', 'privy', 'prize',
  'probe', 'prone', 'prong', 'proof', 'prose', 'proud', 'prove', 'prowl', 'proxy', 'prude',
  'prune', 'psalm', 'pubic', 'pudgy', 'puffy', 'pulpy', 'pulse', 'punch', 'pupil', 'puppy',
  'puree', 'purer', 'purge', 'purse', 'pushy', 'putty', 'pygmy', 'quack', 'quail', 'quake',
  'qualm', 'quark', 'quart', 'quash', 'quasi', 'queen', 'queer', 'quell', 'query', 'quest',
  'queue', 'quick', 'quiet', 'quill', 'quilt', 'quirk', 'quite', 'quota', 'quote', 'quoth',
  'rabbi', 'rabid', 'racer', 'radar', 'radii', 'radio', 'rainy', 'raise', 'rajah', 'rally',
  'ralph', 'ramen', 'ranch', 'randy', 'range', 'rapid', 'rarer', 'raspy', 'ratio', 'ratty',
  'raven', 'rayon', 'razor', 'reach', 'react', 'reams', 'reaps', 'rears', 'reeds', 'reefs',
  'reeks', 'reels', 'reeve', 'reins', 'rends', 'rents', 'rests', 'rheum', 'ricks', 'rides',
  'rifts', 'riled', 'rills', 'rimes', 'rings', 'riots', 'rises', 'risks', 'rites', 'riven',
  'roads', 'roams', 'roars', 'robed', 'robes', 'rocks', 'roles', 'rolls', 'roman', 'roofs',
  'rooks', 'rooms', 'roots', 'roped', 'ropes', 'roses', 'rosin', 'routs', 'roved', 'rowed',
  'ruffs', 'ruins', 'ruled', 'rules', 'runes', 'rungs', 'ruses', 'sable', 'sabre', 'sacks',
  'sagas', 'sages', 'sahib', 'sails', 'saith', 'sales', 'salts', 'sands', 'sated', 'saved',
  'saves', 'sawed', 'scans', 'scars', 'scrip', 'scull', 'seals', 'seams', 'seamy', 'seats',
  'sects', 'sedge', 'seeds', 'seeks', 'seems', 'seers', 'sells', 'sends', 'serfs', 'serge',
  'sewed', 'sexes', 'shams', 'sheaf', 'sheds', 'shins', 'ships', 'shoes', 'shoon', 'shops',
  'shots', 'shows', 'shred', 'shuns', 'shuts', 'sibyl', 'sided', 'sides', 'sighs', 'signs',
  'silks', 'sills', 'sings', 'sinks', 'sires', 'sites', 'sixes', 'sized', 'sizes', 'skein',
  'skies', 'skims', 'skins', 'skips', 'slabs', 'slags', 'slake', 'slaps', 'slats', 'slave',
  'slays', 'sleds', 'slily', 'slips', 'slits', 'slops', 'slugs', 'slums', 'snags', 'snaps',
  'snobs', 'snows', 'soars', 'socks', 'sofas', 'soils', 'soles', 'solos', 'songs', 'sonny',
  'sores', 'sorts', 'sough', 'souls', 'soups', 'souse', 'sowed', 'spake', 'spans', 'spars',
  'spies', 'spins', 'spits', 'spoor', 'spots', 'spurs', 'squaw', 'stabs', 'stags', 'stars',
  'stays', 'stems', 'steps', 'stews', 'stile', 'stirs', 'stops', 'strew', 'studs', 'sucks',
  'suits', 'sulks', 'swain', 'swans', 'sward', 'sways', 'swims', 'tacks', 'tails', 'takes',
  'tales', 'talks', 'tamed', 'tanks', 'tapes', 'tares', 'tarry', 'tarts', 'tasks', 'taxed',
  'taxes', 'teams', 'tears', 'teems', 'teens', 'tells', 'tempi', 'temps', 'tends', 'tents',
  'terms', 'tests', 'texts', 'thine', 'throe', 'ticks', 'tides', 'tiers', 'tiled', 'tiles',
  'tills', 'tilts', 'timed', 'times', 'tinge', 'tints', 'tired', 'tires', 'toads', 'toils',
  'tolls', 'tombs', 'tomes', 'toned', 'tones', 'tongs', 'tools', 'toque', 'torts', 'tours',
  'towed', 'towns', 'toyed', 'trams', 'traps', 'trays', 'treed', 'trees', 'tress', 'tries',
  'trill', 'trips', 'troth', 'trots', 'tubes', 'tufts', 'tuned', 'tunes', 'turns', 'tusks',
  'twain', 'twigs', 'twins', 'typed', 'types', 'units', 'unsay', 'urged', 'urges', 'users',
  'usury', 'vales', 'vanes', 'vases', 'veils', 'veins', 'veldt', 'venal', 'vents', 'verbs',
  'vests', 'vexed', 'vexes', 'vials', 'vices', 'views', 'viler', 'vines', 'vizor', 'voile',
  'volts', 'voted', 'votes', 'vowed', 'waded', 'wafts', 'waged', 'wages', 'waifs', 'wails',
  'waits', 'waked', 'waken', 'wakes', 'walks', 'walls', 'wands', 'waned', 'wanes', 'wants',
  'wards', 'wares', 'warms', 'warns', 'warts', 'wasps', 'waved', 'waves', 'waxed', 'waxes',
  'wears', 'weeds', 'weeks', 'weeps', 'wells', 'wench', 'whims', 'whips', 'whirr', 'whist',
  'whore', 'wicks', 'wilds', 'wiles', 'wills', 'winds', 'wines', 'wings', 'winks', 'wiped',
  'wipes', 'wired', 'wires', 'wisps', 'wives', 'woods', 'wooed', 'words', 'works', 'worms',
  'wraps', 'wrapt', 'writs', 'wroth', 'yards', 'yarns', 'yawns', 'years', 'yells', 'yelps',
  'yoked', 'yokes', 'yolks', 'yours', 'zones'
];

// Fallback words for when API fails
const FALLBACK_WORDS = [
  'react', 'build', 'stack', 'cloud', 'pixel', 'debug', 'learn', 'write', 'think', 'solve',
  'craft', 'focus', 'style', 'query', 'model', 'class', 'state', 'props', 'route', 'fetch'
];

// Cache for validated words to avoid repeated API calls
const validationCache = new Map<string, boolean>();

export async function isValidWord(word: string): Promise<boolean> {
  const normalizedWord = word.toLowerCase();

  // First check if it's in our game's word list
  if (VALID_WORDS.includes(normalizedWord)) {
    return true;
  }

  // Then check our cache
  if (validationCache.has(normalizedWord)) {
    return validationCache.get(normalizedWord)!;
  }

  try {
    // Use the Free Dictionary API to validate the word
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${normalizedWord}`);
    const isValid = response.ok;
    
    // Cache the result
    validationCache.set(normalizedWord, isValid);
    
    return isValid;
  } catch (error) {
    console.warn('Failed to validate word with API:', error);
    // Fallback to our word list in case of API failure
    return VALID_WORDS.includes(normalizedWord);
  }
}

// Function to temporarily add a word to the valid words list
export function addValidWord(word: string) {
  const normalizedWord = word.toLowerCase();
  if (!VALID_WORDS.includes(normalizedWord)) {
    VALID_WORDS = [...VALID_WORDS, normalizedWord];
  }
  // Also add to cache
  validationCache.set(normalizedWord, true);
}

export async function fetchWordleWord(): Promise<string> {
  try {
    const response = await fetch('/api/wordle', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: WordleResponse = await response.json();
    const solution = data.solution.toLowerCase();
    
    // Add the solution to our valid words list if it's not already there
    addValidWord(solution);
    
    return solution;
  } catch (error) {
    console.warn('Failed to fetch word from API, using fallback:', error);
    // Return a random word from our curated list
    const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
    return FALLBACK_WORDS[randomIndex];
  }
}