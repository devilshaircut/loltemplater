module ApplicationHelper

  # Purpose: Used to determine if the currently loaded controller action's namespace == the strings provided.
  #          Particularly useful in toggling classes based on which page is loaded.
  # Returns:  boolean
  # Parameters:  string or array of strings
  def current_namespace?( name )
    namespace_name = controller.class.name.downcase.split("::")
    return false if namespace_name.length == 1
    ( ( name.is_a? Array ) ? name.include?( namespace_name[0] ) : ( name == namespace_name[0] ) )
  end

  # Purpose: Used to determine if the currently loaded controller name == the strings provided.
  #          Particularly useful in toggling classes based on which site controller is loaded.
  # Returns:  boolean
  # Parameters:  string or array of strings
  def current_controller?( name )
    controller_name   = controller.class.name.downcase.gsub(/controller/, "").split("::").last
    ( ( name.is_a? Array ) ? name.include?( controller_name ) : ( name == controller_name ))
  end
  
  # Purpose: Used to determine if the currently loaded controller action == the strings provided.
  #          Particularly useful in toggling classes based on which page is loaded.
  # Returns:  boolean
  # Parameters:  string or array of strings
  def current_action?( name )
    ( ( name.is_a? Array ) ? name.include?( controller.action_name.downcase ) : ( name == controller.action_name ) )
  end
end
