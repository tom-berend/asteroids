


// https://mariusschulz.com/blog/typescript-2-2-mixin-classes
// Marius Schulz



type Constructor<T = {}> = new (...args: any[]) => T;

// The type Constructor<T> is an alias for the construct signature that describes
// a type which can construct objects of the generic type T and whose constructor
// function accepts an arbitrary number of parameters of any type. It uses a
// generic parameter default (introduced with TypeScript 2.3) to specify that
// T should be treated as the {} type unless specified otherwise.



function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}


// Here we have a function called Timestamped that accepts a parameter called
// Base of the generic type TBase. Note that TBase is constrained to be compatible
// with Constructor, that is, the type must be able to construct something.

// Within the body of the function, we create and return a new class that derives
// from Base. This syntax might look a little strange at first. We're creating
// a class expression rather than a class declaration, the more common way of
// defining classes. Our new class defines a single property called timestamp
// and immediately assigns the number of milliseconds elapsed since the UNIX epoch.

// Note that the class expression returned from the mixin function is an unnamed
// class expression because the class keyword is not followed by a name. In contrast
// to class declarations, class expressions don't have to be named. You could
// optionally add a name which would be local to the class' body and would allow
// the class to refer to itself, like this:


function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class Timestamped extends Base {
      timestamp = Date.now();
    };
  }




  //Now that we've covered the two type aliases and the declaration of the mixin
  // function, let's see how we can include the mixin in another class:

  class User {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  // Create a new class by mixing "Timestamped" into "User"
  const TimestampedUser = Timestamped(User);

  // Instantiate the new "TimestampedUser" class
  const user = new TimestampedUser("John Doe");

  // We can now access properties from both the "User" class
  // and our "Timestamped" mixin in a type-safe manner
  console.log(user.name);
  console.log(user.timestamp);


// The TypeScript compiler understands that we've created and used a mixin here.
// Everything is fully statically typed and we get the usual tooling support
// such as autocompletion and refactorings.




///////////////////////////////////////////////////////////////

// Mixins with a Constructor

// Now, let's move on to a slightly more advanced mixin. This time, we're
// going to define a constructor within our mixin class:

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tag: string | null;

    constructor(...args: any[]) {
      super(...args);
      this.tag = null;
    }
  };
}


// If you define a constructor function in a mixin class, it must have a single
// rest parameter of type any[]. The reason for this is that the mixin should
//not be tied to a specific class with known constructor parameters; therefore
// the mixin should accept an arbitrary number of arbitrary values as constructor
// parameters. All of the parameters are passed to the constructor of Base, and
// then the mixin does its thing. In our case, it initializes the tag property.


// We would use the Tagged mixin in the same way that we used Timestamped before:

// Create a new class by mixing "Tagged" into "User"
const TaggedUser = Tagged(User);

// Instantiate the new "TaggedUser" class
const user2 = new TaggedUser("John Doe");

// We can now access properties from both the "User" class
// and our "Tagged" mixin in a type-safe manner
user2.name = "Jane Doe";
user2.tag = "janedoe";


///////////////////////////////////////////////////////////////

// Mixins with Methods

// Up until now, we've only added data properties in our mixins. Let's now look
// at a mixin that additionally implements two methods:

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

// We're returning a regular ES2015 class from our mixin function. This means you
// can make use of all supported class features, such as constructors, properties,
// methods, getters/setters, static members, and so on.

// One more time, here's how we would use the Activatable mixin with our User class:

const ActivatableUser = Activatable(User);

// Instantiate the new "ActivatableUser" class
const user3 = new ActivatableUser("John Doe");

// Initially, the "isActivated" property is false
console.log(user3.isActivated);

// Activate the user
user3.activate();

// Now, "isActivated" is true
console.log(user.isActivated);





///////////////////////////////////////////////////////////////

//Composing Multiple Mixins

// The flexibility of mixins becomes apparent once you start composing them. A
// class can include as many mixins as you like! To demonstrate this, let's
// compose all the mixins we've seen in this post:

const SpecialUser = Activatable(Tagged(Timestamped(User)));
const user4 = new SpecialUser("John Doe");

// Now, I'm not sure whether the SpecialUser class is terribly useful, but the
// point is, TypeScript statically understands this sort of mixin composition.
// The compiler can type-check all usages and suggest available members within
// the autocompletion list:

// Contrast this with class inheritance and you'll see the difference: A class
// can only have a single base class. Inheriting from multiple base classes
// is not possible in JavaScript and therefore, neither in TypeScript.

